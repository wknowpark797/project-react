import { forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	useEffect(() => {
		if (Open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [Open]);

	// ref 매개체에 modal(자기자신)을 담아 부모에게 보낸다.
	return (
		/*
			[ Framer Motion ]
			모션을 직접 커스텀하여 작업하면 unmount할 때 모션동작이 불가능하다.
			-> framer motion을 적용하면 컴포넌트가 unmount할 때 모션효과가 끝날때까지 unmount를 자동으로 지연시켜준다.

			[ 사용방법 ]
			1. 모션을 걸고 싶은 태그에 motion. 지정
			2. 속성 지정
				- initial (모션 시작)
				- animate (모션 완료)
				- exit (모션 사라짐)
			3. 각 속성에 값 지정
				- x (가로축)
				- y (세로축)
				- rotate (회전)
				- scale (확대, 축소)

			[ 주의할 점 ]
			- AnimatePresence 사용시 내부 컴포넌트에 연결되어 있는 ref값을 제거해야 한다.
			- React 17버전에서 framer-motion은 6버전대로 설치
		*/
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='modal'
					initial={{ opacity: 0, x: '100%' }}
					animate={{ opacity: 1, x: '0', transition: { duration: 0.5 } }}
					exit={{ opacity: 0, scale: 0, transition: { duration: 0.5, delay: 0.5 } }}
				>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.5 } }}
						exit={{ opacity: 0, transition: { delay: 0 } }}
					>
						{props.children}
					</motion.div>
					<motion.span
						className='close'
						onClick={() => setOpen(false)}
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
						exit={{ opacity: 0, x: -100, transition: { duration: 0.5, delay: 0 } }}
					>
						close
					</motion.span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Modal;

/*
  useRef로 참조객체를 연결할 때 JSX는 가능하지만 사용자가 직접 만든 컴포넌트는 불가능
  => 해결방법
    - 참조하려고 하는 컴포넌트 내부에서 forwardRef를 사용하여 자기자신을 참조객체에 연결하여 부모에게 역으로 전달처리

  [ forwardRef ]
  - 자식 컴포넌트 요소를 호출하는 부모 컴포넌트에 역으로 참조해서 전달
    (양방향 데이터 바인딩 가능)

  [ useImperativeHandle ]
  - 자식 컴포넌트가 아닌 특정 커스텀 객체를 부모로 전달
  - forwardRef 안쪽에서만 사용이 가능하다.
*/
