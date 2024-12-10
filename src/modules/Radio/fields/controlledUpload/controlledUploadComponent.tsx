'use client'

import React, { useCallback } from 'react'
import { UploadFieldClientProps } from 'payload'
import {
  // useField,
  Button,
  useForm,
  FieldLabel,
  useFormFields,
  UploadField,
} from '@payloadcms/ui'

import './index.scss'

type controlledUploadComponentProps = {
  // fieldToUse: string
  checkboxFieldPath: string
} & UploadFieldClientProps

export const ControlledUploadComponent: React.FC<controlledUploadComponentProps> = ({
  field,
  // fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps,
  ...rest // Pass through other upload field props
}) => {
  const { label } = field

  const checkboxFieldPath = path?.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  const { dispatchFields } = useForm()

  // The value of the checkbox
  // We're using separate useFormFields to minimise re-renders
  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string
  })

  const handleUploadLock = useCallback(
    (e) => {
      e.preventDefault()

      dispatchFields({
        type: 'UPDATE',
        path: checkboxFieldPath,
        value: !checkboxValue,
      })
    },
    [checkboxValue, checkboxFieldPath, dispatchFields],
  )

  const readOnly = readOnlyFromProps || checkboxValue
  //
  return (
    <div className="field-type controlled-upload-field-component">
      <div className="label-wrapper">
        {/* <FieldLabel htmlFor={`field-${path}`} label={label} /> */}

        <Button className="lock-button" buttonStyle="none" onClick={handleUploadLock}>
          {checkboxValue ? 'Enable Upload' : 'Disable Upload'}
        </Button>
      </div>

      <UploadField path={path} field={field} readOnly={Boolean(readOnly)} {...rest} />
    </div>
  )
}

// export const ControlledUploadComponent: React.FC<TrackSourceComponentProps> = ({
//   field,
//   controlFieldPath: controlFieldPathFromProps,
//   path,
//   ...rest // Pass through other upload field props
// }) => {
//   const { label } = field

//   const controlFieldPath = path?.includes('.')
//     ? `${path}.${controlFieldPathFromProps}`
//     : controlFieldPathFromProps

//   const { dispatchFields } = useForm()

//   const controlFieldValue = useFormFields(([fields]) => {
//     return fields[controlFieldPath]?.value as boolean
//   })

//   const handleToggle = useCallback(
//     (e) => {
//       e.preventDefault()
//       dispatchFields({
//         type: 'UPDATE',
//         path: controlFieldPath,
//         value: !controlFieldValue,
//       })
//     },
//     [controlFieldValue, controlFieldPath, dispatchFields],
//   )

//   return (
//     <div className="field-type track-source-component">
//       <div className="label-wrapper">
//         <FieldLabel htmlFor={`field-${path}`} label={label} />
//         <Button className="toggle-button" buttonStyle="none" onClick={handleToggle}>
//           {controlFieldValue ? 'Disable Upload' : 'Enable Upload'}
//         </Button>
//       </div>

//       {/* Here's the actual upload field */}
//       <Upload {...rest} path={path} field={field} disabled={!controlFieldValue} />
//     </div>
//   )
// }
