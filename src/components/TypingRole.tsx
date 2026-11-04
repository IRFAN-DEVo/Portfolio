import { useState, useEffect } from 'react';

interface TypingRoleProps {
  roles?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export default function TypingRole({
  roles = [
    'Python / Django Developer',
    'Backend Systems Engineer',
    'REST API & PostgreSQL Specialist',
    'Full-Stack Architect',
  ],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 1800,
}: TypingRoleProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentRole = roles[roleIndex];

    if (!isDeleting && currentText === currentRole) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? currentRole.substring(0, prev.length - 1)
            : currentRole.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, roles, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-flex items-center">
      <span>{currentText}</span>
      <span className="w-[2px] h-5 bg-[#ff5c3d] ml-1.5 animate-pulse inline-block" />
    </span>
  );
}

