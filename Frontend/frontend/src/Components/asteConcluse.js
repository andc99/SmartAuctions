import React from "react";
import "bulma/css/bulma.css";
import TileAsta from "./TileAsta";
import Web3 from "web3";
import { ABI_STORAGE, ADDRESS_STORAGE } from "../Ethereum/config.js";
import Footer from "./Footer";
import { css } from "@emotion/core";
import { GridLoader } from "react-spinners";

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

class Concluse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			auctionData: [],
			loaded: false
		};
	}

	onUpdate = val => {};
	onBlockNumber = val => {};

	componentWillMount() {
		const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

		const storageContract = new web3.eth.Contract(ABI_STORAGE, ADDRESS_STORAGE);
		var that = this;
		storageContract.methods
			.getEndedAuctions()
			.call({ from: this.state.account })
			.then(function(result) {
				var mapping = [];
				var length = result[0].length;
				console.log(length);
				for (var i = 0; i < length; i++) {
					var tmp = {
						openAuctions_Owner: result[0][i],
						openAuctions_Title: result[1][i],
						openAuctions_Url: result[2][i],
						openAuctions_Type: result[3][i]
					};
					mapping.push(tmp);
				}
				console.log(mapping);
				that.setState({
					auctionData: mapping,
					loaded: true
				});
			});
	}

	render() {
		return (
			<div>
				<section className="hero is-primary is-bold">
					<div className="hero-body">
						<div className="container">
							<h1 className="title is-2">Aste concluse</h1>
						</div>
					</div>
				</section>
				<br />
				{this.state.loaded == false ? (
					<div className="columns">
						<div className="column is-one-half">
							<div className="GridLoader">
								<GridLoader
									css={override}
									sizeUnit={"px"}
									size={50}
									color={"#36D7B7"}
								/>
							</div>
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
						</div>
					</div>
				) : (
					<div style={{ margin: 10 }}>
						<TileAsta auctionData={this.state.auctionData} />
					</div>
				)}

				<nav className="pagination" role="navigation" aria-label="pagination">
					<a className="pagination-previous">Previous</a>
					<a className="pagination-next">Next page</a>
					<ul className="pagination-list">
						<li>
							<a className="pagination-link" aria-label="Goto page 1">
								1
							</a>
						</li>
						<li>
							<span className="pagination-ellipsis">&hellip;</span>
						</li>
						<li>
							<a className="pagination-link" aria-label="Goto page 45">
								45
							</a>
						</li>
						<li>
							<a
								className="pagination-link is-current"
								aria-label="Page 46"
								aria-current="page"
							>
								46
							</a>
						</li>
						<li>
							<a className="pagination-link" aria-label="Goto page 47">
								47
							</a>
						</li>
						<li>
							<span className="pagination-ellipsis">&hellip;</span>
						</li>
						<li>
							<a className="pagination-link" aria-label="Goto page 86">
								86
							</a>
						</li>
					</ul>
				</nav>

				<Footer onUpdate={this.onUpdate} onBlockNumber={this.onBlockNumber} />
			</div>
		);
	}
}

export default Concluse;
