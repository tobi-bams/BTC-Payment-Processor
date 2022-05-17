import React, { useMemo } from "react"
import FormGroup from "../ui/FormGroup"
import { isValidExtPubKey } from "@swan-bitcoin/xpub-lib"
import Button from "../ui/Button"

const ExtPubKeyInput = ({ onEnteredXpub, extPubKey, network, onChange }) => {
  const isValid = useMemo(() => isValidExtPubKey(extPubKey, network), [
    extPubKey,
    network,
  ])

  const isEmptyExtPubKey = extPubKey === ""
  const isFilled = !isEmptyExtPubKey

  const xPubInputRef = React.createRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredXpub = xPubInputRef.current.value;

    const xpub = enteredXpub;

    onEnteredXpub(xpub);

  }

  return (
    <form className="w-full mx-auto text-center" onSubmit={submitHandler} noValidate>
      <FormGroup>
        <textarea className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400" rows="2" required id="xpub" ref={xPubInputRef} value={extPubKey} onChange={onChange} placeholder="Paste your xPub here" />
      </FormGroup>
      {isFilled && !isValid && (
        <div className="w-full px-6 py-3 rounded-sm border text-white bg-red-600 border-red-600" role="alert"><b>Error: </b>The entered xPub key is invalid. Try again.</div>
      )}
      <FormGroup>
        <Button text="Confirm and save" submit full />
      </FormGroup>
    </form>
  )
}

export { ExtPubKeyInput }