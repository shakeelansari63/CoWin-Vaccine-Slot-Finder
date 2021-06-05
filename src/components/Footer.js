import { GoLogoGithub, GoMarkGithub } from 'react-icons/go'
const Footer = () => {
    return (
        <div>
            <h6>Like my Project? Like it on <a href='https://github.com/shakeelansari63/CoWin-Vaccine-Slot-Finder' target='_new'>
                <GoMarkGithub size={28} style={{ color: 'black' }} /> &nbsp;
                <GoLogoGithub size={42} style={{ color: 'black' }} />
            </a></h6>
        </div>
    )
}

export default Footer
