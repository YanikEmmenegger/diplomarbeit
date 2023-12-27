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

// ... (existing imports)

// ... (existing imports)

// ... (existing imports)

const Modal: FC<ModalProps> = ({ isOpen, onChange, title, description, children }) => {
    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-CalorieCompass-Neutral backdrop-blur-sm fixed inset-0" />
                <Dialog.Content className=" fixed drop-shadow-md top-[50%] left-[50%] w-full h-full translate-x-[-50%] translate-y-[-50%] bg-CalorieCompass-Neutral p-[10px] focus:outline-none">
                    <div className={"flex mx-auto md:w-3/4  w-full flex-col items-center"}>
                        <Dialog.Close asChild>
                            <button
                                className="text-neutral-400 hover:text-white  appearance-none items-center justify-center rounded-full focus:outline-none"
                                aria-label="Close"
                            >
                                <CgClose fontSize={30} />
                            </button>
                        </Dialog.Close>

                        <Dialog.Title className="text-2xl w-[60%] text-center font-bold my-4 pb-2 border-b-2 border-white"> {title}</Dialog.Title>
                        <div className={" h-[80vh] lg:w-[80%] w-full overflow-x-hidden overflow-y-auto"}>
                            {children}
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;



