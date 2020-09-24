//import { listSurveyQuestions as GetQuestions } from "../../graphql/queries";
function ListQuestions() {
  /*const [questions, getQuestions] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const questionData = await API.graphql(graphqlOperation(GetQuestions));
      console.log("questionsdata : ", questionData);

      getQuestions(questionData.data.listSurveyQuestions.items);
    } catch (error) {
      console.log("error fetching the questions . . ", error);
    }
  }

  const [tooltipsAndPopovers, setTooltipsAndPopovers] = React.useState(false);

  return (
    <>
      <Button onClick={() => setTooltipsAndPopovers(true)} color="danger">
        Add Question
      </Button>
      <Card>
        {questions.map((question, index) => (
          <Card key={index}>
            <CardBody>{question.questionText}</CardBody>
            <Button
              className="btn-link"
              color="primary"
              onClick={() => setTooltipsAndPopovers(true)}
              type="button"
            >
              Edit
            </Button>
          </Card>
        ))}
      </Card>

      <Modal
        isOpen={tooltipsAndPopovers}
        toggle={() => setTooltipsAndPopovers(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalPopoversLabel">
            Modal title
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setTooltipsAndPopovers(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <h5>Popover in a modal</h5>
          <p>
            This{" "}
            <Button
              className="popover-test"
              color="secondary"
              role="button"
              id="popover1"
            >
              button
            </Button>{" "}
            <UncontrolledPopover target="#popover1" placement="top">
              <PopoverHeader>Popover Title</PopoverHeader>
              <PopoverBody>Popover body content is set here.</PopoverBody>
            </UncontrolledPopover>
            triggers a popover on click.
          </p>
          <hr />
          <h5>Tooltips in a modal</h5>
          <p>
            <a className="tooltip-test" href="#pablo" id="tooltip1">
              This link
            </a>{" "}
            <UncontrolledTooltip target="#tooltip1" placement="top">
              Tooltip
            </UncontrolledTooltip>
            and{" "}
            <a className="tooltip-test" href="#pablo" id="tooltip2">
              that link
            </a>{" "}
            <UncontrolledTooltip target="#tooltip2" placement="top">
              Tooltip
            </UncontrolledTooltip>
            have tooltips on hover.
          </p>
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button
              className="btn-link"
              color="default"
              onClick={() => setTooltipsAndPopovers(false)}
              type="button"
            >
              Never mind
            </Button>
          </div>
          <div className="divider" />
          <div className="right-side">
            <Button className="btn-link" color="danger" type="button">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );*/
}

export default ListQuestions;
