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
use OpenAPIServer\Model\BlogPatchBody;

/**
 * BlogPatchBodyTest Class Doc Comment
 *
 * @package OpenAPIServer\Model
 * @author  OpenAPI Generator team
 * @link    https://github.com/openapitools/openapi-generator
 *
 * @coversDefaultClass \OpenAPIServer\Model\BlogPatchBody
 */
class BlogPatchBodyTest extends TestCase
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
     * Test "BlogPatchBody"
     */
    public function testBlogPatchBody()
    {
        $testBlogPatchBody = new BlogPatchBody();
        $namespacedClassname = BlogPatchBody::getModelsNamespace() . '\\BlogPatchBody';
        $this->assertSame('\\' . BlogPatchBody::class, $namespacedClassname);
        $this->assertTrue(
            class_exists($namespacedClassname),
            sprintf('Assertion failed that "%s" class exists', $namespacedClassname)
        );
        self::markTestIncomplete(
            'Test of "BlogPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "title"
     */
    public function testPropertyTitle()
    {
        self::markTestIncomplete(
            'Test of "title" property in "BlogPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "slug"
     */
    public function testPropertySlug()
    {
        self::markTestIncomplete(
            'Test of "slug" property in "BlogPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "shortDesc"
     */
    public function testPropertyShortDesc()
    {
        self::markTestIncomplete(
            'Test of "shortDesc" property in "BlogPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "image"
     */
    public function testPropertyImage()
    {
        self::markTestIncomplete(
            'Test of "image" property in "BlogPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "content"
     */
    public function testPropertyContent()
    {
        self::markTestIncomplete(
            'Test of "content" property in "BlogPatchBody" model has not been implemented yet.'
        );
    }

    /**
     * Test getOpenApiSchema static method
     * @covers ::getOpenApiSchema
     */
    public function testGetOpenApiSchema()
    {
        $schemaArr = BlogPatchBody::getOpenApiSchema();
        $this->assertIsArray($schemaArr);
    }
}

