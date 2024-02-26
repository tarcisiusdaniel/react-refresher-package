import HeaderImg from '../../assets/investment-calculator-logo.png';

export default function Header() {
    return (
        <header id = "header">
            <img src={HeaderImg} />
            <h1>React Investment Calculator</h1>
        </header>
    )
}