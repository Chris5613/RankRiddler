import logo from '../../Assets/Match-History-Icons/tiny_val_logo.png'

const MatchHistoryBox = () => {
  return (
    <div className='match-box'>
      <div className='match-score'>
        <h2>1 - 10</h2>
      </div>
      <div className='match-participant'>
        <h2>Vs</h2>
        <h2>Mao</h2>
      </div>
      <img src={logo} alt="logo" width={100}/>
      <div className='match-result'>
        <h2 style={{ color: 'green' }}>WIN</h2>
      </div>
  </div>
  )
}

export default MatchHistoryBox