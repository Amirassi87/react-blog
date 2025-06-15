export default function Modal({ setModalIsOpen, deleteArticle }) {
	return (
		<>
			<div className="modal-arrow"></div>
			<div className="modal-container">
				<div className="modal-body">Are you sure to delete this article?</div>
				<div className="footer">
					<input
						type="button"
						value="No"
						onClick={() => {
							setModalIsOpen(false);
						}}
					/>
					<input
						type="button"
						value="Yes"
						onClick={() => {
							deleteArticle();
						}}
					/>
				</div>
			</div>
		</>
	);
}
