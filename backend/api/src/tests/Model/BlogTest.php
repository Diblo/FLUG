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
use OpenAPIServer\Model\Blog;

/**
 * BlogTest Class Doc Comment
 *
 * @package OpenAPIServer\Model
 * @author  OpenAPI Generator team
 * @link    https://github.com/openapitools/openapi-generator
 *
 * @coversDefaultClass \OpenAPIServer\Model\Blog
 */
class BlogTest extends TestCase
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
     * Test "Blog"
     */
    public function testBlog()
    {
        $testBlog = new Blog();
        $namespacedClassname = Blog::getModelsNamespace() . '\\Blog';
        $this->assertSame('\\' . Blog::class, $namespacedClassname);
        $this->assertTrue(
            class_exists($namespacedClassname),
            sprintf('Assertion failed that "%s" class exists', $namespacedClassname)
        );
        self::markTestIncomplete(
            'Test of "Blog" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "uid"
     */
    public function testPropertyUid()
    {
        self::markTestIncomplete(
            'Test of "uid" property in "Blog" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "title"
     */
    public function testPropertyTitle()
    {
        self::markTestIncomplete(
            'Test of "title" property in "Blog" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "slug"
     */
    public function testPropertySlug()
    {
        self::markTestIncomplete(
            'Test of "slug" property in "Blog" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "shortDesc"
     */
    public function testPropertyShortDesc()
    {
        self::markTestIncomplete(
            'Test of "shortDesc" property in "Blog" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "image"
     */
    public function testPropertyImage()
    {
        self::markTestIncomplete(
            'Test of "image" property in "Blog" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "content"
     */
    public function testPropertyContent()
    {
        self::markTestIncomplete(
            'Test of "content" property in "Blog" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "createdAt"
     */
    public function testPropertyCreatedAt()
    {
        self::markTestIncomplete(
            'Test of "createdAt" property in "Blog" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "updatedAt"
     */
    public function testPropertyUpdatedAt()
    {
        self::markTestIncomplete(
            'Test of "updatedAt" property in "Blog" model has not been implemented yet.'
        );
    }

    /**
     * Test getOpenApiSchema static method
     * @covers ::getOpenApiSchema
     */
    public function testGetOpenApiSchema()
    {
        $schemaArr = Blog::getOpenApiSchema();
        $this->assertIsArray($schemaArr);
    }
}
