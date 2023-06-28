import { forwardRef, useState, useImperativeHandle } from 'react';

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	// ref 매개체에 modal(자기자신)을 담아 부모에게 보낸다.
	return (
		<>
			{Open && (
				<aside className='modal' ref={ref}>
					<div className='con'></div>
					<span className='close' onClick={() => setOpen(false)}>
						close
					</span>
				</aside>
			)}
		</>
	);
});

export default Modal;

/*
  useRef로 참조객체 연결은 JSX는 가능하나 사용자가 직접 만든 컴포넌트는 불가능
  => 해결방법
    - 참조하려고 하는 컴포넌트 내부에서 forwardRef를 사용하여 자기자신을 참조객체에 연결하여 부모에게 역으로 전달처리

  [ forwardRef ]
  - 자식 컴포넌트 요소를 호출하는 부모 컴포넌트에 역으로 참조해서 전달
    (양방향 데이터 바인딩 가능)

  [ useImperativeHandle ]
  - 자식 컴포넌트가 아닌 특정 커스텀 객체를 부모로 전달
  - forwardRef 안쪽에서만 사용이 가능하다.
*/
