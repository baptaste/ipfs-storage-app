function updateNewView(callback: () => void) {
  if (document.startViewTransition) {
    const transition: any = document.startViewTransition(callback);
    transition.ready.then(() => {
      document.documentElement.animate(
        [
          { transform: 'translateX(100%)' },
          { transform: 'translateX(50%)' },
          { transform: 'translateX(25%)' },
          { transform: 'translateX(100px)' },
          { transform: 'translateX(50px)' },
          { transform: 'translateX(40px)' },
          { transform: 'translateX(30px)' },
          { transform: 'translateX(20px)' },
          { transform: 'translateX(10px)' },
          { transform: 'translateX(9px)' },
          { transform: 'translateX(8px)' },
          { transform: 'translateX(7px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(5px)' },
          { transform: 'translateX(4px)' },
          { transform: 'translateX(3px)' },
          { transform: 'translateX(2px)' },
          { transform: 'translateX(1px)' },
          { transform: 'translateX(0px)' },
        ],
        {
          duration: 400,
          easing: 'ease-in',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  }
}

function updateOldView(callback: () => void) {
  if (document.startViewTransition) {
    const transition: any = document.startViewTransition(callback);
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          transform: ['translateX(0%)', 'translateX(50%)', 'translateX(100%)'],
          zIndex: [1, 1, 1],
        },
        {
          duration: 600,
          easing: 'ease-out',
          pseudoElement: '::view-transition-old(root)',
        },
      );
    });
  }
}

type ViewTransitionType = 'new' | 'old';

export function updateView(type: ViewTransitionType, navigateCallback: () => void) {
  if (type === 'new') {
    updateNewView(navigateCallback);
  } else if (type === 'old') {
    updateOldView(navigateCallback);
  }
}
