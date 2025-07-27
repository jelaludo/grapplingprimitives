import { ModalPosition, ContainerSize, BJJConcept } from '../types/concepts';

export const calculateModalPosition = (
  concept: BJJConcept | null,
  containerSize: ContainerSize,
  isMobile: boolean = false
): ModalPosition => {
  if (isMobile) {
    return { side: 'center', vertical: 'center' };
  }

  if (!concept) {
    return { side: 'right', vertical: 'bottom' };
  }

  return {
    side: concept.axis_mental_physical < 0.5 ? 'right' : 'left',
    vertical: concept.axis_self_opponent < 0.5 ? 'bottom' : 'top'
  };
};

export const calculateModalStyles = (
  position: ModalPosition,
  containerSize: ContainerSize
): React.CSSProperties => {
  const horizontalOffset = Math.max(0.15 * containerSize.width, 180);
  const verticalOffset = Math.max(0.15 * containerSize.height, 80);
  
  const isCentered = position.side === 'center' && position.vertical === 'center';
  
  return {
    left: isCentered ? '50%' : position.side === 'left' ? 'auto' : horizontalOffset,
    right: isCentered ? 'auto' : position.side === 'left' ? horizontalOffset : 'auto',
    top: isCentered ? '50%' : position.vertical === 'top' ? verticalOffset : 'auto',
    bottom: isCentered ? 'auto' : position.vertical === 'top' ? 'auto' : verticalOffset,
    transform: isCentered ? 'translate(-50%, -50%)' : 'none',
  };
}; 