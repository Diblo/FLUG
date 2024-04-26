/**
 * UserEditorPage.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
 */
import React, { useCallback, useEffect, useState } from "react"

import useUi from "../../../../modules/ui"
import { useNavigation, useRouter } from "../../../../modules/router"

import { text } from "../../../../utils/i18n"

import useService from "../../../../hooks/useService"
import { createUser, getUser, updateUser } from "../../../../services/users"

import {
  ContentAlignment,
  ContentHeader,
} from "../../../../components/Content/Content"
import Scroller from "../../../../components/Scroller/Scroller"

import FormHandler, {
  Form,
  FieldContainer,
  ButtonContainer,
  SubmitButton,
  ResetButton,
  CancelButton,
} from "../../../../components/Form/Form"
import {
  Email,
  FirstName,
  LastName,
} from "../../../../components/Form/Form.Fields"

const UserEditorPage = () => {
  const { activityIndicator, notification } = useUi()
  const { showNotFound } = useRouter()
  const { navigate, location } = useNavigation()
  const [serviceState, dispatch] = useService()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const newUser = location.params.uid === undefined

  const onSubmit = useCallback(
    /**
     * @param {Record<string, any>} values
     */
    (values) => {
      if (newUser) {
        dispatch(createUser(values))
      } else {
        dispatch(updateUser(location.params.uid, values))
      }
    },
    [newUser, dispatch, location]
  )

  useEffect(
    () => {
      !newUser && dispatch(getUser(location.params.uid))
    },
    // eslint-disable-next-line
    []
  )

  useEffect(
    () => {
      activityIndicator.set(serviceState.loading)

      if (serviceState.init || serviceState.loading) {
        return
      }

      if (newUser) {
        notification.success(text("user.success.created"))
        return navigate.alias("admin.user", {
          pathParams: { uid: serviceState.data.uid },
        })
      }

      if (serviceState.error) {
        return showNotFound(text("user.error.not_found"))
      }

      setFormData(serviceState.data)
    },
    // eslint-disable-next-line
    [serviceState]
  )

  return (
    <Scroller float>
      <ContentAlignment>
        <ContentHeader
          sticky
          title={text(`user.header.${newUser ? "create" : "edit"}`)}
        />
        <FormHandler
          onSubmit={onSubmit}
          initialValues={formData}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <Form submitHandler={handleSubmit}>
              <FieldContainer>
                <FirstName
                  fieldName="firstName"
                  required
                  attributes={{ autoFocus: true }}
                />
                <LastName fieldName="lastName" />
                <Email required fieldName="email" />
              </FieldContainer>
              <ButtonContainer center>
                <SubmitButton disabled={submitting || pristine}>
                  {text(`action.${newUser ? "create" : "save"}`)}
                </SubmitButton>
                <ResetButton
                  onPress={form.reset}
                  disabled={submitting || pristine}
                />
                <CancelButton onPress={navigate.up} />
              </ButtonContainer>
            </Form>
          )}
        />
      </ContentAlignment>
    </Scroller>
  )
}

export default UserEditorPage
