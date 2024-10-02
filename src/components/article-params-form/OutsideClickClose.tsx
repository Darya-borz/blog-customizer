import { RefObject, useEffect, useRef } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	onClose,
	rootRef,
}: UseOutsideClickClose) => {
	const isContain = useRef(false);

	useEffect(() => {
		const handleClick = () => {
			if (!isContain.current) {
				isOpen && onClose?.();
			} else {
				isContain.current = false;
			}
		};

		const handleContainCheck = ({ target }: MouseEvent) => {
			if (target instanceof Node && rootRef.current?.contains(target)) {
				isContain.current = true;
			}
		};

		rootRef.current?.addEventListener('click', handleContainCheck);
		window.addEventListener('click', handleClick);

		return () => {
			rootRef.current?.removeEventListener('click', handleContainCheck);
			window.removeEventListener('click', handleClick);
		};
	}, [isOpen, onClose]);
};
