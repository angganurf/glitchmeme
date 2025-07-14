import UseContext from "../Context";
import { useContext, useState } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import About from "../assets/ipng.png";
import bioVid from "../assets/vids.mp4";
import techVid from "../assets/lore.mp4";
import "../css/MyBioFolder.css";
import { useRef } from "react";

function MyBioFolder() {
	const [generalTap, setGenerapTap] = useState(true);
	const [technologyTap, setTechnologyTap] = useState(false);
	const [hobbTap, setHobbTap] = useState(false);
	const [copySuccess, setCopySuccess] = useState(false);
	const generalVideoRef = useRef(null);
	const technologyVideoRef = useRef(null);
	const hobbyVideoRef = useRef(null);

	const {
		themeDragBar,
		MybioExpand,
		setMybioExpand,
		StyleHide,
		isTouchDevice,
		handleSetFocusItemTrue,
		inlineStyleExpand,
		inlineStyle,
		deleteTap,
	} = useContext(UseContext);

	const technologyText = // don't have to use DangerousHTML
		(
			<>
				<span>🌐 The Lore</span> <br />
				<p>
					Legend has it that GL1TCH emerged when a single NFT transaction
					failed, gas fees skyrocketed, and nodes were thrown into limbo.{" "}
				</p>
				<br />
				<p>
					From the chaos, a digital entity arose. Its code was broken, its logo
					broken, its identity blurred. But it was from that chaos that power
					was born.
				</p>
			</>
		);

	const bioText = // don't have to use DangerousHTML
		(
			<>
				<span>🌀 GL1TCH: The Coin That Wasn’t Meant to Exist</span> <br />
				<p>
					Deep in the depths of the blockchain system, amidst the cracks in
					protocols and lines of perfectly crafted code, something accidental
					was born—GL1TCH.
				</p>{" "}
				<br />A glitch, a digital anomaly. Discarded by the system, but embraced
				by the community. GL1TCH isn&apos;t just a memecoin—it&apos;s a
				resistance to normalcy. A token rooted in a bug, developed into a cult.
				Born from an error, yet a symbol of the existence of those who refuse to
				follow the mainstream.
				<br />
				<br />
				<span>
					<strong>CA: </strong>
					<span
						onClick={() => {
							navigator.clipboard.writeText("0xADFaSdHFAsDFAsdfASDFsADFasf");
							setCopySuccess(true);
							setTimeout(() => setCopySuccess(false), 2000);
						}}
						className="glitch"
						data-text="0xADFaSdHFAsDFAsdfASDFsADFasf"
						title="Click to copy"
					>
						0xADFaSdHFAsDFAsdfASDFsADFasf
					</span>
					{copySuccess && (
						<span
							style={{
								marginLeft: "10px",
								color: "green",
								fontSize: "0.85rem",
								fontWeight: "bold",
							}}
						>
							✔ Copied!
						</span>
					)}
				</span>
			</>
		);

	const hobbyText = // don't have to use DangerousHTML
		(
			<>
				<span>💥 Why GL1TCH? </span>
				<br />
				<br />
				<p>
					<span>🧠 Anti-Mainstream:</span> <br />
					No neat roadmap. Just glitchy vibes and the power of community. <br />
					<br />
					<span>💻 Digital Cult:</span> <br />
					Memes are religion, and GL1TCH is its prophet of glitches. <br />
					<br />
					<span>🌀 Visual Chaos:</span> <br />
					Aesthetics of glitch art, distortion, and error screens are our
					official language. <br /> <br />
					<hr />
					<br />
					👁️ Join the Glitch Enter the void where reality and data collide. At
					GL1TCH, you don&apos;t follow trends—you disrupt the system.
				</p>
			</>
		);

	function handleDragStop(event, data) {
		const positionX = data.x;
		const positionY = data.y;
		setMybioExpand((prev) => ({
			...prev,
			x: positionX,
			y: positionY,
		}));
	}

	function handleBiotap(name) {
		setTechnologyTap(name === "technology");
		setGenerapTap(name === "general");
		setHobbTap(name === "hobby");
	}

	const activeBtnStyle = {
		bottom: "2px",
		outline: "1px dotted black",
		outlineOffset: "-5px",
		borderBottomColor: "#c5c4c4",
		zIndex: "3",
	};

	return (
		<>
			<Draggable
				axis="both"
				handle={".folder_dragbar"}
				grid={[1, 1]}
				scale={1}
				disabled={MybioExpand.expand}
				bounds={{ top: 0 }}
				defaultPosition={{
					x: window.innerWidth <= 500 ? 0 : 70,
					y: window.innerWidth <= 500 ? 0 : 40,
				}}
				onStop={(event, data) => handleDragStop(event, data)}
				onStart={() => handleSetFocusItemTrue("About")}
			>
				<motion.div
					className="bio_folder"
					onClick={(e) => {
						e.stopPropagation();
						handleSetFocusItemTrue("About");
					}}
					style={
						MybioExpand.expand
							? inlineStyleExpand("About")
							: inlineStyle("About")
					}
				>
					<div
						className="folder_dragbar"
						style={{
							background: MybioExpand.focusItem ? themeDragBar : "#757579",
						}}
					>
						<div className="bio_barname">
							<img src={About} alt="About" />
							<span>About</span>
						</div>
						<div className="bio_barbtn">
							<div
								onClick={
									!isTouchDevice
										? (e) => {
												e.stopPropagation();
												setMybioExpand((prev) => ({
													...prev,
													hide: true,
													focusItem: false,
												}));
												StyleHide("About");
										  }
										: undefined
								}
								onTouchEnd={(e) => {
									e.stopPropagation();
									setMybioExpand((prev) => ({
										...prev,
										hide: true,
										focusItem: false,
									}));
									StyleHide("About");
								}}
								onTouchStart={(e) => e.stopPropagation()}
							>
								<p className="dash"></p>
							</div>

							<div>
								<p
									className="x"
									onClick={
										!isTouchDevice
											? () => {
													// Pause all videos
													generalVideoRef.current?.pause();
													technologyVideoRef.current?.pause();
													hobbyVideoRef.current?.pause();

													deleteTap("About");
											  }
											: undefined
									}
									onTouchEnd={() => {
										generalVideoRef.current?.pause();
										technologyVideoRef.current?.pause();
										hobbyVideoRef.current?.pause();

										deleteTap("About");
									}}
								>
									×
								</p>
							</div>
						</div>
					</div>
					<div className="file_tap_container-bio">
						<p
							onClick={() => handleBiotap("general")}
							style={generalTap ? activeBtnStyle : {}}
						>
							General
						</p>
						<p
							onClick={() => handleBiotap("technology")}
							style={technologyTap ? activeBtnStyle : {}}
						>
							The Lore
						</p>
						<p
							onClick={() => handleBiotap("hobby")}
							style={hobbTap ? activeBtnStyle : {}}
						>
							Why Glitch
						</p>
					</div>
					<div className="folder_content">
						<div className="folder_content-bio" style={{ display: "block" }}>
							{generalTap && (
								<video
									ref={generalVideoRef}
									className="bio_img_other"
									autoPlay
									controls
									loop
									playsInline
									src={techVid}
								/>
							)}

							{technologyTap && (
								<video
									ref={technologyVideoRef}
									className="bio_img_other"
									autoPlay
									controls
									loop
									playsInline
									src={bioVid}
								/>
							)}

							{hobbTap && (
								<video
									ref={hobbyVideoRef}
									className="bio_img_other"
									autoPlay
									controls
									loop
									playsInline
									src={bioVid}
								/>
							)}

							<div className="biotext_container">
								<p
									className={
										generalTap ? "bio_text_1_other" : "bio_text_1_other"
									}
								>
									{generalTap
										? bioText
										: technologyTap
										? technologyText
										: hobbyText}
								</p>
							</div>
						</div>

						<div className="bio_btn_container">
							<div
								className="bio_btn_ok"
								onClick={
									!isTouchDevice
										? () => {
												// Pause all videos
												generalVideoRef.current?.pause();
												technologyVideoRef.current?.pause();
												hobbyVideoRef.current?.pause();

												deleteTap("About");
										  }
										: undefined
								}
								onTouchEnd={() => {
									generalVideoRef.current?.pause();
									technologyVideoRef.current?.pause();
									hobbyVideoRef.current?.pause();

									deleteTap("About");
								}}
							>
								<span>OK</span>
							</div>

							<div
								className="bio_btn_cancel"
								onClick={
									!isTouchDevice
										? () => {
												// Pause all videos
												generalVideoRef.current?.pause();
												technologyVideoRef.current?.pause();
												hobbyVideoRef.current?.pause();

												deleteTap("About");
										  }
										: undefined
								}
								onTouchEnd={() => {
									generalVideoRef.current?.pause();
									technologyVideoRef.current?.pause();
									hobbyVideoRef.current?.pause();

									deleteTap("About");
								}}
							>
								<span>Close</span>
							</div>
						</div>
					</div>
				</motion.div>
			</Draggable>
		</>
	);
}

export default MyBioFolder;
