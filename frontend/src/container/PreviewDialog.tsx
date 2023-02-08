import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { DialogContent } from '@mui/material';


export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    contents: string;
  }

const PreviewDialog = (props: SimpleDialogProps) => {
    const { onClose, selectedValue, open, contents } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return <>
        <Dialog 
            onClose={handleClose} 
            open={open}
            fullWidth={true}
            maxWidth={"md"}>
            <DialogTitle>미리보기</DialogTitle>
            <DialogContent>
                <ReactMarkdown
                    children={contents}
                    remarkPlugins={[remarkGfm]}
                    components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            // @ts-ignore
                            style={dark}
                            language={match[1]}
                            PreTag="div"
                            
                            {...props}
                        />
                        ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                        )
                    }
                    }}
                />
            </DialogContent>
            
        </Dialog>
    </>
}

export default PreviewDialog