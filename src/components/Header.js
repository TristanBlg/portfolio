// @flow

import * as React from 'react'
import Navbar from './Navbar'

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

type Props = {

};

export default class Header extends React.Component<Props> {
	render() {
		return(
			<header className="header">
				<Navbar links={navbarLinks} />
			</header>
		)
	}
}
