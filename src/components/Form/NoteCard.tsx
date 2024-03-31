import { Badge, Card, Stack } from "react-bootstrap";
import { Note } from "../../types";
import { useNavigate } from "react-router-dom";
import styles from "./mainpage.module.css";

type CardType = {
  note: Note;
};

const NoteCard = ({ note }: CardType) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/${note.id}`)} className={styles.note_card}>
      <Card.Body>
        <Stack
          className="align-items-center justify-content-center h-100"
          gap={2}
        >
          <span>{note.title}</span>
          {note?.tags?.length > 0 && (
            <Stack
              direction="horizontal"
              className="justify-content-center flex-wrap"
              gap={2}
            >
              {note.tags.map((tag) => (
                <Badge>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
