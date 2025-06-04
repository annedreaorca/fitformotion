"use client";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { IconMail, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from 'react';

// Registration Prompt Modal Component
const RegisterPromptModal = ({ 
  isOpen, 
  onClose
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="md"
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900/50 to-zinc-900/10 backdrop-blur-sm",
        base: "border-[1px] border-zinc-200 dark:border-zinc-700",
        header: "border-b-[1px] border-zinc-200 dark:border-zinc-700",
        footer: "border-t-[1px] border-zinc-200 dark:border-zinc-700",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-2">
            <IconUser size={28} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            Discover 500+ Exercises
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-normal">
            Create your free account to access our complete exercise library with detailed instructions!
          </p>
        </ModalHeader>
        
        <ModalBody className="py-4">
          <div className="space-y-3">
            {[
              "Browse 500+ exercises with detailed instructions",
              "Watch demonstration videos for perfect form",
              "Filter by muscle group, equipment, and difficulty",
              "Save your favorite exercises to collections",
              "Create custom workout routines",
              "Track your exercise mastery progress"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#961d1b] rounded-full flex-shrink-0"></div>
                <span className="text-zinc-700 dark:text-zinc-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-red-950/20 dark:to-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              <strong className="text-zinc-900 dark:text-white">100% Free</strong> • No credit card required • Get started in 30 seconds
            </p>
          </div>
        </ModalBody>
        
        <ModalFooter className="flex flex-col gap-2 pt-2">
          <Button
            color="primary"
            size="lg"
            className="w-full font-semibold bg-[#961d1b] text-white"
            startContent={<IconMail size={18} />}
            as="a"
            href="https://app.fitformotion.com"
            target="_blank"
          >
            Sign Up Free
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-zinc-600 dark:text-zinc-400"
            onPress={onClose}
          >
            Maybe Later
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Page Heading Component
const PageHeading = ({ title }: { title: string }) => (
  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{title}</h1>
);

// Main Exercises Page Component
export default function ExercisesPage() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Show the modal immediately when the page loads
  useEffect(() => {
    setIsRegisterModalOpen(true);
  }, []);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <PageHeading title="Browse Exercises" />
      </div>

      {/* Placeholder content that shows when modal is closed */}
      <div className="text-center py-12">
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Sign up to access our complete exercise library with detailed instructions and videos.
        </p>
        <Button
          color="primary"
          onPress={() => setIsRegisterModalOpen(true)}
          className="bg-[#961d1b] text-white"
        >
          Browse Exercises
        </Button>
      </div>

      <RegisterPromptModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}