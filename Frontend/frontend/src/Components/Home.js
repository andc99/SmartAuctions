import React from "react";
import "bulma/css/bulma.css";
import TileAsta from "./TileAsta";
import ParticleComponent from "./Particles";
import Web3 from "web3";
import { ABI_STORAGE, ADDRESS_STORAGE } from "../Ethereum/config.js";

class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mounted: false,
			width: "",
			heigth: "",
			auctionData: []
		};
	}

	updateDimensions() {
		var tmp = document.getElementById("cnt");
		this.setState({
			mounted: true,
			width: tmp.offsetWidth,
			heigth: tmp.offsetHeight
		});
	}

	componentWillMount() {
		const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

		const storageContract = new web3.eth.Contract(ABI_STORAGE, ADDRESS_STORAGE);
		var res = {};
		var that = this;
		storageContract.methods
			.getAllContracts()
			.call({ from: this.state.account })
			.then(function(result) {
				var mapping = [];
				var length = result[0].length;
				console.log(length);
				for (var i = 0; i < length; i++) {
					var tmp = {
						openAuctions_Owner: result[0][i],
						openAuctions_ContractAddress: result[1][i],
						openAuctions_Url: result[2][i],
						openAuctions_Title: result[3][i]
					};
					mapping.push(tmp);
				}
				console.log(mapping);
				that.setState({
					auctionData: mapping
				});
			});
	}

	componentDidMount() {
		var tmp = document.getElementById("cnt");
		this.setState({
			mounted: true,
			width: tmp.offsetWidth,
			heigth: tmp.offsetHeight
		});
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}

	render() {
		return (
			<div>
				<div className="hero is-medium is-primary is-bold">
					{this.state.mounted ? (
						<ParticleComponent
							heigth={this.state.heigth}
							width={this.state.width}
						/>
					) : (
						<div />
					)}
					<div id="cnt" className="hero-body">
						<div className="container">
							<div margin="0">
								<h1 className="title is-1">Benvenuto!</h1>
							</div>

							<h1 className="title is-2">Crea subito una nuova asta</h1>

							<br />

							<div className="field is-grouped">
								<p className="control">
									<a
										className="button is-medium is-hovered is-link is-rounded"
										href={"/addAstaInglese"}
									>
										Asta Inglese
									</a>
								</p>
								<p className="control">
									<a
										className="button is-medium is-link is-hovered is-rounded"
										href="addAstaVickrey"
									>
										Asta Vickrey
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
				<br />

				<div>
					<div style={{ textAlign: "center" }}>
						<h1 className="title is-2">Aste in corso</h1>
					</div>
				</div>
				<div style={{ margin: 10 }}>
					<TileAsta auctionData={this.state.auctionData} />
				</div>
			</div>
		);
	}
}
export default Contact;
