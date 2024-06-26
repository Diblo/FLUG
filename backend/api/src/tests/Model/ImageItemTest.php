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
use OpenAPIServer\Model\ImageItem;

/**
 * ImageItemTest Class Doc Comment
 *
 * @package OpenAPIServer\Model
 * @author  OpenAPI Generator team
 * @link    https://github.com/openapitools/openapi-generator
 *
 * @coversDefaultClass \OpenAPIServer\Model\ImageItem
 */
class ImageItemTest extends TestCase
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
     * Test "ImageItem"
     */
    public function testImageItem()
    {
        $testImageItem = new ImageItem();
        $namespacedClassname = ImageItem::getModelsNamespace() . '\\ImageItem';
        $this->assertSame('\\' . ImageItem::class, $namespacedClassname);
        $this->assertTrue(
            class_exists($namespacedClassname),
            sprintf('Assertion failed that "%s" class exists', $namespacedClassname)
        );
        self::markTestIncomplete(
            'Test of "ImageItem" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "uid"
     */
    public function testPropertyUid()
    {
        self::markTestIncomplete(
            'Test of "uid" property in "ImageItem" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "src"
     */
    public function testPropertySrc()
    {
        self::markTestIncomplete(
            'Test of "src" property in "ImageItem" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "alt"
     */
    public function testPropertyAlt()
    {
        self::markTestIncomplete(
            'Test of "alt" property in "ImageItem" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "createdAt"
     */
    public function testPropertyCreatedAt()
    {
        self::markTestIncomplete(
            'Test of "createdAt" property in "ImageItem" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "updatedAt"
     */
    public function testPropertyUpdatedAt()
    {
        self::markTestIncomplete(
            'Test of "updatedAt" property in "ImageItem" model has not been implemented yet.'
        );
    }

    /**
     * Test getOpenApiSchema static method
     * @covers ::getOpenApiSchema
     */
    public function testGetOpenApiSchema()
    {
        $schemaArr = ImageItem::getOpenApiSchema();
        $this->assertIsArray($schemaArr);
    }
}

