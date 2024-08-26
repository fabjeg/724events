import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [inputValue, setInputValue] = useState({
    nom: "",
    prenom: "",
    type: "",
    email: "",
    message: "",
  });

  // Gére le changement de valeur du formulaire
  const handleInputChange = (field, value) => {
    setInputValue((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      // eslint-disable-next-line no-console
      console.log(inputValue);
      if (
        !inputValue.nom ||
        !inputValue.prenom ||
        !inputValue.email ||
        !inputValue.type ||
        !inputValue.message
      ) {
        // eslint-disable-next-line no-alert
        alert("Veuillez remplir tous les champs !");
        setSending(false);
      } else {
        try {
          await mockContactApi();
          setSending(false);
          onSuccess();
        } catch (err) {
          setSending(false);
          onError(err);
        }
      }
    },
    [inputValue, onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            value={inputValue.nom}
            onChange={(e) => handleInputChange("nom", e.target.value)}
          />
          <Field
            placeholder=""
            label="Prénom"
            value={inputValue.prenom}
            onChange={(e) => handleInputChange("prenom", e.target.value)}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            value={inputValue.type}
            onChange={(newValue) => handleInputChange("type", newValue)}
          />
          <Field
            placeholder=""
            label="Email"
            value={inputValue.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          <Button
            type={BUTTON_TYPES.SUBMIT}
            disabled={sending}
          >
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={inputValue.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
