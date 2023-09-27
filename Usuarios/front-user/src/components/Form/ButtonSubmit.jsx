import "./ButtonSubmit.css";
function ButtonSubmit({ content }) {
	return (
		<button type="submit" className="buttonSubmit">
			{content}
		</button>
	);
}

export default ButtonSubmit;
