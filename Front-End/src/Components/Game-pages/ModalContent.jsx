// ModalContent component
const ModalContent = ({
    pic,
    submittedRank,
    result,
    point,
    score,
    player,
    refresh,
  }) => (
    <div className="modal-content">
      <br />
      <div className="modal-example">
        <div>
          <div className="modal-example-heading">Correct Rank</div>
          <img
            className="modal-example-image"
            src={pic}
            alt="Radiant"
            width={100}
          />
        </div>
        <div>
          <div className="modal-example-heading">Your Guess</div>
          <img
            className="modal-example-image"
            src={submittedRank}
            alt="rank"
            width={100}
          />
        </div>
        <div>
          <div className="modal-example-heading result-title">Result</div>
          <img
            className="modal-example-image wrong"
            src={result}
            alt="wrong"
            width={70}
          />
          <p className="modal-example-wrong">{point} Point</p>
        </div>
      </div>
      <br />
      <br />
      <p className="text">You currently have {score} points</p>
      <br />
      <p className="text">Credit: {player}</p>
      <button onClick={refresh} className="submit-btn">
        Next Video
      </button>
    </div>
  );
  
export default ModalContent;