
import { bugActions } from '../../store/BugSlice';
import { useSelector, useDispatch } from 'react-redux';

function BugReportForm() {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.nav.title);
  const description = useSelector((state) => state.nav.description);


  const handleTitleChange = (event) => {
    dispatch(bugActions.setTitle(event.target.value));

  };

  const handleDescriptionChange = (event) => {
    dispatch(bugActions.setDescription(event.target.value));

  };

  const submit = (event) => {
    event.preventDefault();

    const data = {};
    data.email = title;
    data.description = description;

    // eslint-disable-next-line no-unused-vars
    const response = fetch('https://rr-back-end.onrender.com/form/bug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    alert('Thank you for your feedback!');
  };

  return (
    <div className="container">
      <h2>See a bug? Please use this form to report it</h2>
      <form
        onSubmit={submit}
        className="form"
        action="https://formsubmit.co/christianwu58@email.com"
        method="POST"
      >
        <label className="form-label">
          Your Email: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <input
          className="form-input"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <br />

        <label className="form-label">
          Description of the bug: <span style={{ color: '#e34234' }}>*</span>
        </label>
        <textarea
          className="form-input"
          value={description}
          onChange={handleDescriptionChange}
          required
        ></textarea>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BugReportForm;
