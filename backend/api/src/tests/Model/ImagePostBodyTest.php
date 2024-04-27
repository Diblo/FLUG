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
use OpenAPIServer\Model\ImagePostBody;

/**
 * ImagePostBodyTest Class Doc Comment
 *
 * @package OpenAPIServer\Model
 * @author  OpenAPI Generator team
 * @link    https://github.com/openapitools/openapi-generator
 *
 * @coversDefaultClass \OpenAPIServer\Model\ImagePostBody
 */
class ImagePostBodyTest extends TestCase
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
     * Test "ImagePostBody"
     */
    public function testImagePostBody()
    {
        $testImagePostBody = new ImagePostBody();
        $namespacedClassname = ImagePostBody::getModelsNamespace() . '\\ImagePostBody';
        $this->assertSame('\\' . ImagePostBody::class, $namespacedClassname);
        $this->assertTrue(
            class_exists($namespacedClassname),
            sprintf('Assertion failed that "%s" class exists', $namespacedClassname)
        );
        self::markTestIncomplete(
            'Test of "ImagePostBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "src"
     */
    public function testPropertySrc()
    {
        self::markTestIncomplete(
            'Test of "src" property in "ImagePostBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "alt"
     */
    public function testPropertyAlt()
    {
        self::markTestIncomplete(
            'Test of "alt" property in "ImagePostBody" model has not been implemented yet.'
        );
    }

    /**
     * Test getOpenApiSchema static method
     * @covers ::getOpenApiSchema
     */
    public function testGetOpenApiSchema()
    {
        $schemaArr = ImagePostBody::getOpenApiSchema();
        $this->assertIsArray($schemaArr);
    }
}
