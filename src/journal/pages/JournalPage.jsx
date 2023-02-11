import { IconButton, Typography } from "@mui/material"
import { AddOutlined, MailOutline } from "@mui/icons-material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { NotheView } from "../views/NotheView"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"

export const JournalPage = () => {

    const dispatch = useDispatch();
    const { isSaving, active } = useSelector(state => state.journal)
    // console.log(isSaving);

    const onClickNewNote = () => {
        dispatch( startNewNote() );
    }

    return (
    <>
        <JournalLayout>


            {/* Mostrar cuando no haya nada seleccionado */}
            {
                (!!active)
                // (false)
                ?
                <NotheView/>
                :
                <NothingSelectedView/>
            }

            {/* Mostrar cuadno haya una nota */}
            {/* <NotheView/> */}

            <IconButton
                onClick={onClickNewNote}
                disabled={isSaving}
                size="large"
                sx={{
                    color:'white',
                    backgroundColor: "error.main",
                    ':hover':{ backgroundColor:'error.main', opacity:0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom:50,
                }}
            >
                <AddOutlined sx={{fontSize:30}}/>
            </IconButton>
        </JournalLayout>
    </>
  )
}
