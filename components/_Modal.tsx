import * as Dialog from '@radix-ui/react-dialog';
import {FC} from "react";
import {CgClose} from "react-icons/cg";

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({isOpen,onChange,title,description,children}) => {
    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-CalorieCompass-Neutral backdrop-blur-sm fixed inset-0"/>
                <Dialog.Content className=" fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full  w-full   translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none">
                    <Dialog.Title className="text-xl text-left font-bold mt-5 "> {title}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                        <button
                            className="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none"
                            aria-label="Close">
                            <CgClose fontSize={32}/>
                        </button>
                    </Dialog.Close>
                    <div className={"mx-auto bg-amber-500"}>
                        {children}
                    </div>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Modal;