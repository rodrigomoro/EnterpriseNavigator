import React, { useState, useEffect } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

export const useOnboardingTour = () => {
  const [hasSeenTour, setHasSeenTour] = useState(false);
  const [tour] = useState(
    () =>
      new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
          classes: 'shadow-md rounded-lg',
          scrollTo: true,
          cancelIcon: {
            enabled: true
          }
        }
      })
  );

  useEffect(() => {
    const tourSeen = localStorage.getItem('erp-tour-completed');
    if (tourSeen) {
      setHasSeenTour(true);
    }
  }, []);

  const startTour = () => {
    tour.addSteps([
      {
        id: 'welcome',
        title: 'Welcome to our ERP System! 👋',
        text: 'Let\'s take a quick tour to help you get started.',
        buttons: [
          {
            text: 'Skip Tour',
            action: () => {
              localStorage.setItem('erp-tour-completed', 'true');
              setHasSeenTour(true);
              tour.complete();
            },
            classes: 'shepherd-button-secondary'
          },
          {
            text: 'Start Tour',
            action: () => tour.next()
          }
        ]
      },
      {
        id: 'people-management',
        title: 'People Management',
        text: 'Here you can manage all your staff, teachers, and students. Add new people, update their information, and manage their roles.',
        attachTo: {
          element: '[data-tour="people-management"]',
          on: 'bottom'
        },
        buttons: [
          {
            text: 'Back',
            action: () => tour.back(),
            classes: 'shepherd-button-secondary'
          },
          {
            text: 'Next',
            action: () => tour.next()
          }
        ]
      },
      {
        id: 'program-management',
        title: 'Program Management',
        text: 'Manage academic programs, courses, and enrollments. Create new programs and track student progress.',
        attachTo: {
          element: '[data-tour="program-management"]',
          on: 'bottom'
        },
        buttons: [
          {
            text: 'Back',
            action: () => tour.back(),
            classes: 'shepherd-button-secondary'
          },
          {
            text: 'Next',
            action: () => tour.next()
          }
        ]
      },
      {
        id: 'calendar',
        title: 'Academic Calendar',
        text: 'View and manage academic schedules, events, and important dates.',
        attachTo: {
          element: '[data-tour="calendar"]',
          on: 'bottom'
        },
        buttons: [
          {
            text: 'Back',
            action: () => tour.back(),
            classes: 'shepherd-button-secondary'
          },
          {
            text: 'Next',
            action: () => tour.next()
          }
        ]
      },
      {
        id: 'settings',
        title: 'System Settings',
        text: 'Configure system settings, integrations, and user preferences.',
        attachTo: {
          element: '[data-tour="settings"]',
          on: 'bottom'
        },
        buttons: [
          {
            text: 'Back',
            action: () => tour.back(),
            classes: 'shepherd-button-secondary'
          },
          {
            text: 'Finish',
            action: () => {
              localStorage.setItem('erp-tour-completed', 'true');
              setHasSeenTour(true);
              tour.complete();
            }
          }
        ]
      }
    ]);

    tour.start();
  };

  return {
    startTour,
    hasSeenTour
  };
};

// Add Shepherd.js styles to Tailwind classes
const tourStyles = `
  .shepherd-button {
    @apply px-4 py-2 rounded-md text-sm font-medium transition-colors;
  }

  .shepherd-button:not(:disabled):hover {
    @apply bg-primary/90;
  }

  .shepherd-button-secondary {
    @apply bg-secondary text-secondary-foreground hover:bg-secondary/80;
  }

  .shepherd-button:not(.shepherd-button-secondary) {
    @apply bg-primary text-primary-foreground;
  }

  .shepherd-content {
    @apply rounded-lg border bg-card text-card-foreground shadow-lg;
  }

  .shepherd-text {
    @apply p-6 text-sm;
  }

  .shepherd-header {
    @apply border-b px-6 py-4;
  }

  .shepherd-title {
    @apply text-lg font-semibold;
  }

  .shepherd-footer {
    @apply border-t px-6 py-4 flex justify-between;
  }
`;