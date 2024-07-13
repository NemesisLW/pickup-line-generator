interface FormInputProps {
  style: string;
  crushDescription: string;
}

interface GenerationParams {
  initialFormState: FormInputProps;
}

interface GenerateButtonProps {
  className?: string;
  text?: string;
  isServerAction?: boolean;
  pending?: boolean;
  formAction?: (formData: FormData) => void | ((payload: FormData) => void);
}

interface GenerateOutputProps {
  prevState: GenerateOutputState;
  formData: FormData;
}

interface GenerateOutputState {
  message: string;
  pickupLines?: string[];
  InitialFormState?: FormInputProps;
  errors?: any;
  data?: any;
}

interface FormOutputProps {
  pickupLines: string[];
  InitialFormState?: FormInputProps;
}
