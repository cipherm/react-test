const button = (props) => {

    const { onClick, btnName, className, disabled } = props

    return <button onClick={ onClick } className={ className } disabled={ disabled }>{ btnName }</button>

}

export default button
