import UseContext from "../Context";
import { useContext, useState } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import contractIcon from "../assets/folder.png";
import "../css/ContractAddress.css";

function ContractAddress() {
	const [copySuccess, setCopySuccess] = useState(false);

	const {
		themeDragBar,
		ContractExpand,
		setContractExpand,
		StyleHide,
		isTouchDevice,
		handleSetFocusItemTrue,
		inlineStyleExpand,
		inlineStyle,
		deleteTap,
	} = useContext(UseContext);

	// Static contract address - you can replace this with your actual CA
	const contractAddress = "";

	function handleDragStop(event, data) {
		const positionX = data.x;
		const positionY = data.y;
		setContractExpand((prev) => ({
			...prev,
			x: positionX,
			y: positionY,
		}));
	}

	function handleCopyCA() {
		navigator.clipboard.writeText(contractAddress);
		setCopySuccess(true);
		setTimeout(() => setCopySuccess(false), 1000);
	}

	return (
		<>
			<Draggable
				axis="both"
				handle={".contract_dragbar"}
				grid={[1, 1]}
				scale={1}
				disabled={ContractExpand.expand}
				bounds={{ top: 0 }}
				defaultPosition={{
					x: window.innerWidth <= 500 ? 25 : 650,
					y: window.innerWidth <= 500 ? 550 : 50,
				}}
				onStop={(event, data) => handleDragStop(event, data)}
				onStart={() => handleSetFocusItemTrue("Contract")}
			>
				<motion.div
					className="contract_dialog"
					onClick={(e) => {
						e.stopPropagation();
						handleSetFocusItemTrue("Contract");
					}}
					style={
						ContractExpand.expand
							? inlineStyleExpand("Contract")
							: inlineStyle("Contract")
					}
				>
					<div
						className="contract_dragbar"
						style={{
							background: ContractExpand.focusItem ? themeDragBar : "#757579",
						}}
					>
						<div className="contract_barname">
							<img src={contractIcon} alt="Contract" />
							<span>Contract Address</span>
						</div>
						<div className="contract_barbtn">
							<div
								onClick={
									!isTouchDevice
										? (e) => {
												e.stopPropagation();
												setContractExpand((prev) => ({
													...prev,
													hide: true,
													focusItem: false,
												}));
												StyleHide("Contract");
										  }
										: undefined
								}
								onTouchEnd={(e) => {
									e.stopPropagation();
									setContractExpand((prev) => ({
										...prev,
										hide: true,
										focusItem: false,
									}));
									StyleHide("Contract");
								}}
								className="contract_minimize_btn"
							>
								<span>_</span>
							</div>
							<div
								onClick={
									!isTouchDevice
										? (e) => {
												e.stopPropagation();
												setContractExpand((prev) => ({
													...prev,
													expand: !ContractExpand.expand,
												}));
												deleteTap("Contract");
										  }
										: undefined
								}
								onTouchEnd={(e) => {
									e.stopPropagation();
									setContractExpand((prev) => ({
										...prev,
										expand: !ContractExpand.expand,
									}));
									deleteTap("Contract");
								}}
								className="contract_expand_btn"
							>
								<div className="contract_expand_btn_inner"></div>
							</div>
							<div
								onClick={
									!isTouchDevice
										? (e) => {
												e.stopPropagation();
												setContractExpand((prev) => ({
													...prev,
													show: false,
													hide: false,
													expand: false,
													focusItem: false,
												}));
												deleteTap("Contract");
										  }
										: undefined
								}
								onTouchEnd={(e) => {
									e.stopPropagation();
									setContractExpand((prev) => ({
										...prev,
										show: false,
										hide: false,
										expand: false,
										focusItem: false,
									}));
									deleteTap("Contract");
								}}
								className="contract_close_btn"
							>
								<span>×</span>
							</div>
						</div>
					</div>

					<div className="contract_content">
						<div className="contract_form">
							<label htmlFor="ca-input">Contract Address:</label>
							<input
								id="ca-input"
								type="text"
								value={contractAddress}
								readOnly
								className="contract_input"
							/>
							<button
								className="copy_ca_btn"
								onClick={handleCopyCA}
								title="Copy Contract Address"
							>
								Copy CA
							</button>
							{copySuccess && (
								<div className="copy_success">
									✔ Copied to clipboard!
								</div>
							)}
						</div>
					</div>
				</motion.div>
			</Draggable>
		</>
	);
}

export default ContractAddress; 