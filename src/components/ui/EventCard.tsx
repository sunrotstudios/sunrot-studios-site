import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface EventData {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  category?: string;
  image?: string;
  isPast?: boolean;
  isUpcoming?: boolean;
}

interface EventCardProps {
  event: EventData;
  variant?: 'timeline' | 'grid' | 'compact';
  className?: string;
  onClick?: (event: EventData) => void;
  showDetails?: boolean;
}

const EventCard: FC<EventCardProps> = ({
  event,
  variant = 'grid',
  className,
  onClick,
  showDetails = false
}) => {
  const [isExpanded, setIsExpanded] = useState(showDetails);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(event);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return { day, month, year };
  };

  const { day, month, year } = formatDate(event.date);

  const getCardClasses = () => {
    const baseClasses = 'cursor-pointer transition-all duration-300';
    
    switch (variant) {
      case 'timeline':
        return clsx(
          baseClasses,
          'flex items-center gap-6 py-6 border-b border-gray-200',
          isHovered ? 'bg-gray-50' : ''
        );
      case 'compact':
        return clsx(
          baseClasses,
          'p-4 border border-gray-300',
          isHovered ? 'border-black shadow-lg' : ''
        );
      default: // grid
        return clsx(
          baseClasses,
          'p-6 border-2 border-black',
          isHovered ? 'shadow-xl transform scale-105' : '',
          event.isPast ? 'opacity-60' : ''
        );
    }
  };

  const renderDateBlock = () => (
    <div className={clsx(
      'flex-shrink-0',
      variant === 'timeline' ? 'w-20' : 'mb-4'
    )}>
      <div className={clsx(
        'text-center',
        variant === 'compact' ? 'text-xs' : ''
      )}>
        <div className={clsx(
          'font-black leading-none',
          variant === 'compact' ? 'text-2xl' : 'text-4xl lg:text-6xl',
          event.isPast ? 'text-gray-400' : 'text-black'
        )}>
          {day}
        </div>
        <div className={clsx(
          'font-bold uppercase tracking-wider',
          variant === 'compact' ? 'text-xs' : 'text-sm lg:text-base',
          event.isPast ? 'text-gray-400' : 'text-black'
        )}>
          {month}
        </div>
        {variant !== 'compact' && (
          <div className={clsx(
            'text-sm text-gray-500',
            event.isPast ? 'text-gray-300' : ''
          )}>
            {year}
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="flex-grow min-w-0">
      <div className="space-y-2">
        <h3 className={clsx(
          'font-black leading-tight',
          variant === 'compact' ? 'text-lg' : 'text-2xl lg:text-4xl',
          event.isPast ? 'text-gray-600' : 'text-black'
        )}>
          {event.title}
        </h3>
        
        {event.time && (
          <div className={clsx(
            'font-medium',
            variant === 'compact' ? 'text-sm' : 'text-lg',
            event.isPast ? 'text-gray-500' : 'text-gray-700'
          )}>
            {event.time}
          </div>
        )}
        
        <div className={clsx(
          'font-medium',
          variant === 'compact' ? 'text-sm' : 'text-lg',
          event.isPast ? 'text-gray-500' : 'text-gray-600'
        )}>
          {event.location}
        </div>

        {event.category && (
          <div className={clsx(
            'inline-block px-2 py-1 border text-xs font-bold uppercase tracking-wider',
            event.isPast ? 'border-gray-300 text-gray-400' : 'border-gray-400 text-gray-600'
          )}>
            {event.category}
          </div>
        )}
      </div>
    </div>
  );

  const renderExpandedDetails = () => (
    <AnimatePresence>
      {isExpanded && event.description && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-4 border-t border-gray-200">
            <p className={clsx(
              'leading-relaxed',
              variant === 'compact' ? 'text-sm' : 'text-base lg:text-lg',
              'text-gray-700'
            )}>
              {event.description}
            </p>
            {event.image && (
              <div className="mt-4">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-32 object-cover border border-gray-300"
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const cardContent = () => {
    if (variant === 'timeline') {
      return (
        <>
          {renderDateBlock()}
          {renderContent()}
          {event.isUpcoming && (
            <div className="flex-shrink-0">
              <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
            </div>
          )}
        </>
      );
    }

    return (
      <>
        {renderDateBlock()}
        {renderContent()}
        {renderExpandedDetails()}
      </>
    );
  };

  return (
    <motion.div
      className={clsx(getCardClasses(), className)}
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={variant === 'grid' ? { scale: 1.02 } : {}}
      whileTap={{ scale: 0.98 }}
      data-animate="text"
    >
      {cardContent()}
    </motion.div>
  );
};

export default EventCard;