interface FormInputProps {
  prevStyle: string;
  prevCrushDescription: string;
}

interface GenerateButtonProps {
  className?: string;
  text?: string;
  isServerAction?: boolean;
  pending?: boolean;
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
