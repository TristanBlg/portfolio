import React from 'react'

import css from './styles.scss'

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
		name: "Skills",
		url: "#"
	},
	{
		name: "Contact",
		url: "#"
	}
]
const infos = {
	firstname: "Tristan",
	lastname: "BOULANGER",
	job: "Développeur Front-End"
}
const sidebarLinks = [
	{
		name: "g",
		url: "#"
	},
	{
		name: "in",
		url: "#"
	}
]

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
	const infos = props.infos

	return (
		<div className="infos">
			<h1 className="infos__name"><span className="infos__name-firstname">{infos.firstname}</span><br/><span className="infos__name-lastname">{infos.lastname}</span></h1>
			<h2 className="infos__job">{infos.job}</h2>
		</div>
	)
}
function Sidebar(props){
	const links = props.links
	const listLinks = links.map((link, index) => 
		<li className="sidebar__item" key={index}>
			<a className="sidebar__item-link" href={link.url}>{link.name}</a>
		</li>
	)
	return (
		<ul className="sidebar">{listLinks}</ul>
	)
}

export default class Header extends React.Component {
	render() {
		return(
			<header className="header">
				<Navbar links={navbarLinks} />
				<Infos infos={infos} />
				<Sidebar links={sidebarLinks} />
			</header>
		)
	}
}