import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ href, children, className = '' }: LinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Here you would typically use a router to navigate
    // For now, we'll just use the view state in the parent component
    const view = href.replace('/', '');
    window.dispatchEvent(new CustomEvent('changeView', { detail: view || 'home' }));
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}