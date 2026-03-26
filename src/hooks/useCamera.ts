import { useState, useRef, useCallback, useEffect } from 'react';

interface UseCameraReturn {
  stream: MediaStream | null;
  error: string | null;
  capturedImage: string | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  capture: (videoRef: React.RefObject<HTMLVideoElement>) => void;
  retake: () => void;
}

export function useCamera(): UseCameraReturn {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setStream(null);
    }
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });

      // Prevent race conditions and state updates on unmounted component
      if (!isMounted.current) {
        mediaStream.getTracks().forEach((track) => track.stop());
        return;
      }

      // If we already have one (from React Strict Mode double-calling), kill the old one
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      streamRef.current = mediaStream;
      setStream(mediaStream);
    } catch (err: any) {
      console.error('Camera error:', err);
      if (!isMounted.current) return;
      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else {
        setError('Failed to access camera.');
      }
    }
  }, []);

  const capture = useCallback((videoRef: React.RefObject<HTMLVideoElement>) => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedImage(dataUrl);
      stopCamera();
    }
  }, [stopCamera]);

  const retake = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    stream,
    error,
    capturedImage,
    startCamera,
    stopCamera,
    capture,
    retake,
  };
}
