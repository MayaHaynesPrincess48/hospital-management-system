import { useRef, useEffect, useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { VideoChatProps } from '@/types';

export default function VideoChat({
  localStream,
  remoteStream,
  handleEndCall,
  toggleMute,
  toggleVideo,
  isMuted,
  isVideoOff,
  isDoctor,
  selfAvatar,
  remoteAvatar,
}: VideoChatProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      if (localVideoRef.current !== null) {
        localVideoRef.current.srcObject = localStream;
      }
    }
  }, [localStream, isVideoOff]);


  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);


  

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {/* Remote Video */}
      <div className="absolute inset-0 flex items-center justify-center">
        {remoteStream ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            id="remoteVideo"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <Avatar className="w-32 h-32 sm:w-48 sm:h-48">
              <AvatarImage src={remoteAvatar} alt="Remote user" />
              <AvatarFallback>{isDoctor ? 'P' : 'D'}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>

      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-24 h-18 sm:w-32 sm:h-24 overflow-hidden rounded-lg shadow-lg">
        {localStream && !isVideoOff ? (
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
              <AvatarImage src={selfAvatar} alt="You" />
              <AvatarFallback>{isDoctor ? 'D' : 'P'}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>


      {/* Control Buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black to-transparent">
        <div className="flex justify-center space-x-2 sm:space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={toggleMute}
                  variant={isMuted ? "destructive" : "secondary"}
                  size="icon"
                  className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                >
                  {isMuted ? <MicOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Mic className="h-4 w-4 sm:h-5 sm:w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMuted ? 'Unmute' : 'Mute'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={toggleVideo}
                  variant={isVideoOff ? "destructive" : "secondary"}
                  size="icon"
                  className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                >
                  {isVideoOff ? <VideoOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Video className="h-4 w-4 sm:h-5 sm:w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isVideoOff ? 'Turn on video' : 'Turn off video'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleEndCall}
                  variant="destructive"
                  size="icon"
                  className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                >
                  <PhoneOff className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>End call</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
