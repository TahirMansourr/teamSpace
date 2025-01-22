import { Button } from "@mantine/core";
import { useSprintContext } from "../Contexts/SprintContext";

const ShowSprintsButton = () => {
    const {showSprintsOnBackLogPage , setShowSprintsOnBackLogPage} = useSprintContext();
    return (
        <Button onClick={() => setShowSprintsOnBackLogPage(!showSprintsOnBackLogPage)}> Show Sprints</Button>
    )
}

export default ShowSprintsButton;