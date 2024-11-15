import { FC } from "react";
import { Modal } from "../components/molecules/Modal";
import { Text } from "../components/atoms/Text";
import { Button } from "../components/atoms/Button";

type Props = {
  data?: Record<string, FormDataEntryValue>;
  onReset?: () => void;
  onClose?: () => void;
};

export const SubmitModal: FC<Props> = ({ data, onReset, onClose }) => {
  return (
    <Modal open={Boolean(data)}>
      {data && (
        <>
          <div className="flex flex-col pb-5">
            <Text className="text-3xl pb-2" center>
              ✈️
            </Text>
            {Object.entries(data).map(([key, value]) => (
              <Text className="flex gap-1" key={key}>
                <Text className="capitalize" as="span" bold>
                  {key}:
                </Text>
                <Text as="span">{value.toString()}</Text>
              </Text>
            ))}
          </div>
          <div className="flex gap-2 justify-center">
            <Button onClick={onReset}>Reset</Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </>
      )}
    </Modal>
  );
};
