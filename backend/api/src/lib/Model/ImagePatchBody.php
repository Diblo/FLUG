<?php

/**
 * FLUG Service API
 * PHP version 7.4
 *
 * @package OpenAPIServer
 * @author  OpenAPI Generator team
 * @link    https://github.com/openapitools/openapi-generator
 */

/**
 * A service API for the Fyns Linux User Group website
 * The version of the OpenAPI document: 0.1.0
 * Generated by: https://github.com/openapitools/openapi-generator.git
 */

/**
 * NOTE: This class is auto generated by the openapi generator program.
 * https://github.com/openapitools/openapi-generator
 */
namespace OpenAPIServer\Model;

use OpenAPIServer\BaseModel;

/**
 * ImagePatchBody
 *
 * @package OpenAPIServer\Model
 * @author  OpenAPI Generator team
 * @link    https://github.com/openapitools/openapi-generator
 */
class ImagePatchBody extends BaseModel
{
    /**
     * @var string Models namespace.
     * Can be required for data deserialization when model contains referenced schemas.
     */
    protected const MODELS_NAMESPACE = '\OpenAPIServer\Model';

    /**
     * @var string Constant with OAS schema of current class.
     * Should be overwritten by inherited class.
     */
    protected const MODEL_SCHEMA = <<<'SCHEMA'
{
  "minProperties" : 1,
  "type" : "object",
  "properties" : {
    "src" : {
      "type" : "string",
      "description" : "Data URI scheme, encoded in base64.",
      "format" : "uri-byte",
      "example" : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
    },
    "alt" : {
      "maxLength" : 50,
      "minLength" : 15,
      "type" : "string",
      "description" : "Alternative text description for the image.",
      "example" : "Image Alt Text"
    }
  }
}
SCHEMA;
}