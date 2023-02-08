import React, { useState, useEffect, useMemo, useRef } from 'react';
import CodeMirror, {useCodeMirror} from '@uiw/react-codemirror';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader';
import { langs } from '@uiw/codemirror-extensions-langs';
import Button from '../components/Button'
import styled from 'styled-components';
import PreviewDialog from './PreviewDialog';

const CompleteButton = styled(Button)`
    position: absolute;
    right: 24px;
`

export default function App() {
    const [open, setOpen] = useState(false)
    const [contents, setContents] = useState(`제목\n----------\n내용`)
    const handlePreviewButtonClick = () => {
        setOpen(!open)
    }
    const handleCodeMirrorChange = (value: string) => {
        setContents(value)
    }
    return <>
		<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
			<DrawerHeader />
            <CodeMirror
                value={contents}
                onChange={handleCodeMirrorChange}
                minHeight="400px"
                maxHeight='500px'
                extensions={[langs.markdown()]}
                />
            <Button onClick={handlePreviewButtonClick}>미리보기</Button>
            <CompleteButton >작성완료</CompleteButton>
        </Box>
        <PreviewDialog contents={contents} open={open} selectedValue={""} onClose={handlePreviewButtonClick}/>
    </>
  }