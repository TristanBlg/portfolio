// @flow

import * as React from 'react'

type Props = {
	links: Array<Object>
};

export default class Navbar extends React.Component<Props> {
	render() {
		const { links } = this.props
		const listLinks = links.map((link, index) =>
			<li className="nav__item" key={index}>
				<a className="nav__item-link" href={link.url}>{link.name}</a>
			</li>
		)
		return (
			<ul className="nav">{listLinks}</ul>
		)
	}
}
