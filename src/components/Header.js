// @flow

import * as React from 'react'
import css from './styles.scss'

type Props = {
	links: Array<Object>,
	infos: Object
};

const navbarLinks = [
	{
		name: "Home",
		url: "#"
	},
	{
		name: "About",
		url: "#"
	},
	{
		name: "Portfolio",
		url: "#"
	},
	{
		name: "My skills",
		url: "#"
	},
	{
		name: "Contact",
		url: "#"
	}
]
const me = {
	firstname: "Tristan",
	lastname: "BOULANGER",
	job: "Développeur Front-End"
}

function Navbar(props){
	const links = props.links
	const listLinks = links.map((link, index) =>
		<li className="nav__item" key={index}>
			<a className="nav__item-link" href={link.url}>{link.name}</a>
		</li>
	)
	return (
		<ul className="nav">{listLinks}</ul>
	)
}
function Infos(props){
	const me = props.infos
	return (
		<div className="infos">
			<h1 className="infos__name"><span className="infos__name-firstname">{me.firstname}</span><br/><span className="infos__name-lastname">{me.lastname}</span></h1>
			<h2 className="infos__job">{me.job}</h2>
		</div>
	)
}

export default class Header extends React.Component<Props> {
	render() {
		const {links, infos} = this.props;
		return(
			<header className="header">
				<Navbar links={navbarLinks} />
				<Infos infos={me} />
			</header>
		)
	}
}