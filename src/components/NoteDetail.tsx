import { Link, useOutletContext } from "react-router-dom";
import { Note } from "../types";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

type DetailPropsType = {
  deleteNote: (id: string) => void;
};

const NoteDetail = ({ deleteNote }: DetailPropsType) => {
  const props: Note = useOutletContext();

  return (
    <div className="container py-5">
      <Row>
        <Col>
          <h1>{props.title}</h1>

          <Stack direction="horizontal" gap={3} className="flex-wrap">
            {props.tags?.map((tag) => (
              <Badge>{tag.label}</Badge>
            ))}
          </Stack>
        </Col>
        <Col>
          <Stack direction="horizontal" gap={2}>
            <Link to={"edit"}>
              <Button>Düzenle</Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => deleteNote(props.id)}
            >
              Sil
            </Button>
            <Link to={"/"}>
              <Button variant="outline-secondary">Geri</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown className={"my-5"}>{props.markdown}</ReactMarkdown>
    </div>
  );
};

export default NoteDetail;
