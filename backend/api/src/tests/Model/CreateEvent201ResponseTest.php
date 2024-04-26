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
 * Please update the test case below to test the model.
 */
namespace OpenAPIServer\Model;

use PHPUnit\Framework\TestCase;
use OpenAPIServer\Model\CreateEvent201Response;

/**
 * CreateEvent201ResponseTest Class Doc Comment
 *
 * @package OpenAPIServer\Model
 * @author  OpenAPI Generator team
 * @link    https://github.com/openapitools/openapi-generator
 *
 * @coversDefaultClass \OpenAPIServer\Model\CreateEvent201Response
 */
class CreateEvent201ResponseTest extends TestCase
{

    /**
     * Setup before running any test cases
     */
    public static function setUpBeforeClass(): void
    {
    }

    /**
     * Setup before running each test case
     */
    public function setUp(): void
    {
    }

    /**
     * Clean up after running each test case
     */
    public function tearDown(): void
    {
    }

    /**
     * Clean up after running all test cases
     */
    public static function tearDownAfterClass(): void
    {
    }

    /**
     * Test "CreateEvent201Response"
     */
    public function testCreateEvent201Response()
    {
        $testCreateEvent201Response = new CreateEvent201Response();
        $namespacedClassname = CreateEvent201Response::getModelsNamespace() . '\\CreateEvent201Response';
        $this->assertSame('\\' . CreateEvent201Response::class, $namespacedClassname);
        $this->assertTrue(
            class_exists($namespacedClassname),
            sprintf('Assertion failed that "%s" class exists', $namespacedClassname)
        );
        self::markTestIncomplete(
            'Test of "CreateEvent201Response" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "success"
     */
    public function testPropertySuccess()
    {
        self::markTestIncomplete(
            'Test of "success" property in "CreateEvent201Response" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "data"
     */
    public function testPropertyData()
    {
        self::markTestIncomplete(
            'Test of "data" property in "CreateEvent201Response" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "message"
     */
    public function testPropertyMessage()
    {
        self::markTestIncomplete(
            'Test of "message" property in "CreateEvent201Response" model has not been implemented yet.'
        );
    }

    /**
     * Test getOpenApiSchema static method
     * @covers ::getOpenApiSchema
     */
    public function testGetOpenApiSchema()
    {
        $schemaArr = CreateEvent201Response::getOpenApiSchema();
        $this->assertIsArray($schemaArr);
    }
}

