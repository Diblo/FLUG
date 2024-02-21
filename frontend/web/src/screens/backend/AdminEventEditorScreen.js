import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { getUidParameter } from "../../utils/params";
import { fetchData } from "../../utils/api";
import getText from "../../utils/text";

import Content from "../../components/Content";
import Form, { fieldTypes } from "../../components/Form";

import config from "../../config";

/**
 * @typedef {Object} Link
 * @property {string} href
 * @property {string} title
 * @property {('GET'|'POST'|'PATCH'|'DELETE')} [method]
 */

export default function AdminEventEditorScreen() {
  const uid = getUidParameter(useParams());
  const [data, setData] = useState({});
  const [buttons, setButtons] = useState({});
  const fields = {
    title: {
      fieldType: fieldTypes.text,
      label: getText("title"),
      required: true,
      fieldProps: {
        min: 40,
        max: 128,
        focus: true,
      },
    },
    slug: {
      label: getText("slug"),
      fieldType: fieldTypes.slug,
      required: true,
      fieldProps: {
        min: 40,
        max: 128,
      },
    },
    shortDesc: {
      fieldType: fieldTypes.shortDescription,
      label: getText("shortDesc"),
      required: true,
      fieldProps: {
        min: 40,
        max: 150,
      },
    },
    startDateTime: {
      fieldType: fieldTypes.dateTime,
      label: getText("start"),
      required: true,
    },
    endDateTime: {
      fieldType: fieldTypes.dateTime,
      label: getText("end"),
      required: true,
    },
    location: {
      fieldType: fieldTypes.text,
      label: getText("location"),
      fieldProps: {
        min: 5,
        max: 115,
      },
    },
    content: {
      fieldType: fieldTypes.content,
      label: getText("content"),
      required: true,
      fieldProps: {
        min: 300,
      },
    },
  };

  /**
   * @param {Object<string, string|object>} data
   */
  function loadData(data) {
    setData(data);

    if (data._links.add) {
      setButtons({
        submit: {
          link: data._links.add,
          onPress: onSubmitPressed,
          style: "add",
        },
      });
      return;
    }

    setButtons({
      delete: {
        link: data._links.delete,
        onPress: onDeletePressed,
        style: "delete",
      },
      submit: {
        link: data._links.update,
        onPress: onSubmitPressed,
        style: "add",
      },
    });
  }

  /**
   * @param {string} href
   * @param {('GET'|'POST'|'PATCH'|'DELETE')} [method="GET"]
   * @param {object} [data={}]
   */
  function handleRequest(href, method = "GET", data = {}) {
    /**
     * @param {object} response
     */
    function handleResponse(response) {
      if (method === "GET" || method === "PATCH") {
        loadData(response);
      } else if (method === "POST") {
        window.location.href = "/admin/events/" + response.uid;
      } else {
        window.location.href = "/admin/events";
      }
    }

    fetchData(href, handleResponse, method, data);
  }

  const onSubmitPressed = useCallback(
    /**
     * @param {Link} link
     * @param {Object<string, string>} changes
     */
    (link, changes) => {
      handleRequest(link.href, link.method, changes);
    },
    [],
  );

  const onDeletePressed = useCallback(
    /**
     * @param {Link} link
     */
    (link) => {
      handleRequest(link.href, link.method);
    },
    [],
  );

  useEffect(() => {
    if (uid !== undefined) {
      handleRequest(config.api.uris.events + "/" + uid, "GET");
      return;
    }

    loadData({
      _links: {
        add: {
          href: config.api.uris.events,
          method: "POST",
          title: getText("add"),
        },
      },
    });
  }, []);

  return (
    <Content
      pageTitle={
        uid === undefined
          ? getText("createEventHeader")
          : getText("editEventHeader")
      }
      fixedTitlePos={true}
    >
      <Form fields={fields} data={data} buttons={buttons} />
    </Content>
  );
}
