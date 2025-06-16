import { FC, useCallback } from 'react';
import Navigation from '../ui/Navigation';
import { useContentAnimations } from '../../hooks/useContentAnimations';
import InfiniteMenu from '../InfiniteMenu/InfiniteMenu';

interface EventData {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  category?: string;
  isPast?: boolean;
  isUpcoming?: boolean;
  isCurrent?: boolean;
}

const Events: FC = () => {
  useContentAnimations();

  // Event data
  const events: EventData[] = [
    {
      id: '1',
      title: 'CORRUPTED SIGNALS',
      date: '2025-02-28',
      time: '7:00 PM',
      location: 'GALLERY VOID',
      description: 'An exhibition of glitch art and digital archaeology. Works that embrace the beauty of technological failure.',
      category: 'EXHIBITION',
      isPast: true
    },
    {
      id: '2',
      title: 'WAREHOUSE SACRIFICE',
      date: '2025-03-15',
      time: '8:00 PM',
      location: '2600 INDUSTRIAL BLVD',
      description: 'An immersive experience blending digital decay with physical installation. Witness the death and rebirth of obsolete technologies.',
      category: 'INSTALLATION',
      isCurrent: true
    },
    {
      id: '3',
      title: 'DIGITAL SÉANCE',
      date: '2025-04-02',
      time: 'MIDNIGHT',
      location: 'LOCATION: ENCRYPTED',
      description: 'Contact the ghosts in the machine. A participatory ritual connecting with lost data and forgotten algorithms.',
      category: 'PERFORMANCE',
      isUpcoming: true
    },
    {
      id: '4',
      title: 'UNDERGROUND FREQUENCY',
      date: '2025-04-18',
      time: '9:00 PM',
      location: 'BASEMENT LEVEL / INVITE ONLY',
      description: 'Experimental sound performance in a decommissioned server farm. Music that exists only in the frequencies between silence.',
      category: 'AUDIO',
      isUpcoming: true
    },
    {
      id: '5',
      title: 'HEAT DEATH COLLECTIVE',
      date: '2025-05-01',
      time: 'ALL DAY',
      location: 'PIER 9 / WAREHOUSE DISTRICT',
      description: 'A full-day symposium on entropy, decay, and creative destruction. Featuring talks, workshops, and collaborative projects.',
      category: 'SYMPOSIUM',
      isUpcoming: true
    }
  ];

  // Transform events into MenuItem format for InfiniteMenu
  const menuItems = events.map((event) => ({
    image: `https://picsum.photos/800/800?grayscale&random=${event.id}`,
    link: `https://example.com/event/${event.id}`,
    title: event.title,
    description: `${new Date(event.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })} • ${event.location}`
  }));

  // Handle active item changes from InfiniteMenu
  const handleActiveItemChange = useCallback((item: any) => {
    // Simple callback - no complex state management needed
  }, []);

  // Handle movement changes from InfiniteMenu
  const handleMovementChange = useCallback((isMoving: boolean) => {
    // Simple callback - no complex state management needed
  }, []);

  return (
    <div 
      className="min-h-screen bg-white relative overflow-hidden" 
      data-page="events"
    >
      <Navigation />



      {/* InfiniteMenu Component */}
      <div className="absolute inset-0 z-0">
        <InfiniteMenu 
          items={menuItems}
          onActiveItemChange={handleActiveItemChange}
          onMovementChange={handleMovementChange}
        />
      </div>
    </div>
  );
};

export default Events;