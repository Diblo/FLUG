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
use OpenAPIServer\Model\EventPatchBody;

/**
 * EventPatchBodyTest Class Doc Comment
 *
 * @package OpenAPIServer\Model
 * @author  OpenAPI Generator team
 * @link    https://github.com/openapitools/openapi-generator
 *
 * @coversDefaultClass \OpenAPIServer\Model\EventPatchBody
 */
class EventPatchBodyTest extends TestCase
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
     * Test "EventPatchBody"
     */
    public function testEventPatchBody()
    {
        $testEventPatchBody = new EventPatchBody();
        $namespacedClassname = EventPatchBody::getModelsNamespace() . '\\EventPatchBody';
        $this->assertSame('\\' . EventPatchBody::class, $namespacedClassname);
        $this->assertTrue(
            class_exists($namespacedClassname),
            sprintf('Assertion failed that "%s" class exists', $namespacedClassname)
        );
        self::markTestIncomplete(
            'Test of "EventPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "title"
     */
    public function testPropertyTitle()
    {
        self::markTestIncomplete(
            'Test of "title" property in "EventPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "slug"
     */
    public function testPropertySlug()
    {
        self::markTestIncomplete(
            'Test of "slug" property in "EventPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "shortDesc"
     */
    public function testPropertyShortDesc()
    {
        self::markTestIncomplete(
            'Test of "shortDesc" property in "EventPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "startDateTime"
     */
    public function testPropertyStartDateTime()
    {
        self::markTestIncomplete(
            'Test of "startDateTime" property in "EventPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "endDateTime"
     */
    public function testPropertyEndDateTime()
    {
        self::markTestIncomplete(
            'Test of "endDateTime" property in "EventPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "location"
     */
    public function testPropertyLocation()
    {
        self::markTestIncomplete(
            'Test of "location" property in "EventPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "content"
     */
    public function testPropertyContent()
    {
        self::markTestIncomplete(
            'Test of "content" property in "EventPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test getOpenApiSchema static method
     * @covers ::getOpenApiSchema
     */
    public function testGetOpenApiSchema()
    {
        $schemaArr = EventPatchBody::getOpenApiSchema();
        $this->assertIsArray($schemaArr);
    }
}

